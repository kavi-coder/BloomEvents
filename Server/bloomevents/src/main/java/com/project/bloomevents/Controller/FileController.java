package com.project.bloomevents.Controller;

import com.project.bloomevents.FileUpload.FileResponse;
import com.project.bloomevents.FileUpload.FileStorageService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.*;


@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/upload")
public class FileController {
    @Autowired
    private FileStorageService fileStorageService;


    // store function
    public ResponseEntity<FileResponse> uploadFile(MultipartFile file,String imgName, String imgCategory,String uploadDir){
        String fileName = fileStorageService.storeFile(file,imgName,uploadDir);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/upload/"+imgCategory+"/")
                .path(fileName)
                .toUriString();

        FileResponse fileResponse = new FileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());
        return new ResponseEntity<FileResponse>(fileResponse, HttpStatus.OK);
    }

    // store multiple files
    public ResponseEntity<List<FileResponse>> uploadMultipleFile(MultipartFile[] files,  String imgCategory, String uploadDir){
        List<FileResponse> list = new ArrayList<>();
        //final int[] number = {1};
        Arrays.asList(files).stream().forEach(file->{
            String imgName= StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
            String fileName = fileStorageService.storeFile(file,imgName,uploadDir);
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/upload/"+imgCategory+"/")
                    .path(fileName)
                    .toUriString();

            FileResponse fileResponse = new FileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());
            list.add(fileResponse);
            //number[0]++;
        });
        return new ResponseEntity<List<FileResponse>>(list, HttpStatus.OK);
    }

    // load function
    public ResponseEntity<Resource> LoadFile(String fileName,String fileDir,HttpServletRequest request){
        Resource resource = fileStorageService.loadFileAsResource(fileName,fileDir);
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        }catch(IOException ex) {
            System.out.println("Could not determine fileType");
        }
        if(contentType==null) {
            contentType = "application/octet-stream";
        }
        if(resource==null){
            System.out.print("null");
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body( null);
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body( resource);
    }


    // mappings
    //profile pics
    @PostMapping("/uploadprofilepic/{userId}")
    public ResponseEntity<FileResponse> ProfilePicture(@RequestParam("file") MultipartFile file,@PathVariable int userId){
        String imgName=Integer.toString(userId)+".jpg";
        String uploadDir="profilePic";
        return uploadFile(file,imgName,"profilePic",uploadDir);
    }

    @GetMapping("/profilePic/{userId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable int userId, HttpServletRequest request){
        String fileName=Integer.toString(userId)+".jpg";
        String fileDir="profilePic";
        return LoadFile(fileName,fileDir,request);
    }

    // provider logos
    @PostMapping("/provideruploadimage/{providerId}")
    public ResponseEntity<FileResponse> providerImage(@RequestParam("file") MultipartFile file,@PathVariable int providerId){
        String imgName=Integer.toString(providerId)+".jpg";
        String uploadDir="ProviderLogos";
        return uploadFile(file,imgName,"ProviderLogos",uploadDir);
    }

    @GetMapping("/ProviderLogos/{providerId}")
    public ResponseEntity<Resource> getProviderLogo(@PathVariable int providerId, HttpServletRequest request){
        String fileName=Integer.toString(providerId)+".jpg";
        String fileDir="ProviderLogos";
        return LoadFile(fileName,fileDir,request);
    }

    //upload multiple files
    @PostMapping("/uploadprivoderdetailpics/{providerId}")
    public ResponseEntity<List<FileResponse>> uploadProviderDetailImages(@RequestParam("file") MultipartFile[] files,@PathVariable int providerId){
        String uploadDir="ProviderImages/"+Integer.toString(providerId);
        return uploadMultipleFile(files,uploadDir,uploadDir);
    }

    @GetMapping("/ProviderImages/{providerId}")
    public List<String> getProviderDetailImages(@PathVariable int providerId, HttpServletRequest request){
        String fileDir="ProviderImages/"+Integer.toString(providerId);
        return fileStorageService.getMultipleFiles(fileDir);
    }

    @GetMapping("/ProviderImages/{providerId}/{fileName}")
    public ResponseEntity<Resource> getProviderLogo(@PathVariable int providerId,@PathVariable String fileName, HttpServletRequest request){
        String fileDir="ProviderImages/"+Integer.toString(providerId);
        return LoadFile(fileName,fileDir,request);
    }

    @DeleteMapping("/deletedtailimage/{providerId}/{fileName}")
    public boolean deleteDetailImage(@PathVariable int providerId,@PathVariable String fileName){
        String fileDir="ProviderImages/"+Integer.toString(providerId)+"/"+fileName;
        return fileStorageService.deleteDetailImage(fileDir);
    }

}
