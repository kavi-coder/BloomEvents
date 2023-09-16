package com.project.bloomevents.Controller;

import com.project.bloomevents.DTO.PackageDTO;
import com.project.bloomevents.Service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/package")
public class PackageController {
    @Autowired
    private PackageService packageService;

    @GetMapping("/get/allpackages")
    public ResponseEntity<?> getAllpackages(){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        List<PackageDTO> packageList = packageService.getAllpackages();

        if (!packageList.isEmpty()) {
            map.put("status", 1);
            map.put("data", packageList);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Packages list is not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/packagesbyproviderid/{providerId}")
    public ResponseEntity<?> getPackagesbyProviderId(@PathVariable int providerId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        List<PackageDTO> packageList = packageService.getPackagesByProviderId(providerId);

        if (!packageList.isEmpty()) {
            map.put("status", 1);
            map.put("data", packageList);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Packages list is not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/packagecountbyproviderid/{providerId}")
    public ResponseEntity<?> getPackageCountByProviderId(@PathVariable int providerId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        int count = packageService.getPackageCount(providerId);

        if (count >= 0 ) {
            map.put("status", 1);
            map.put("data", count);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Packages list is not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/packagebypackageid/{packageId}")
    public ResponseEntity<?> getPackageByPackageId(@PathVariable int packageId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        PackageDTO packge = packageService.getPackageByPackageId(packageId);

        if (packge!=null) {
            map.put("status", 1);
            map.put("data", packge);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Package not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PostMapping("/addpackage")
    public ResponseEntity<?> addPackage(@RequestBody PackageDTO packageData){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        PackageDTO packge = packageService.addPackage(packageData);

        if (packge!=null) {
            map.put("status", 1);
            map.put("data", packge);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Package not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PutMapping("/updatepackage/{packageId}")
    public ResponseEntity<?> updatePackage(@RequestBody PackageDTO packageData, @PathVariable int packageId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        PackageDTO packge = packageService.updatePackage(packageId,packageData);

        if (packge!=null) {
            map.put("status", 1);
            map.put("data", packge);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Package not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @DeleteMapping("/deletepackage/{packageId}")
    public ResponseEntity<?> deletePackage(@PathVariable int packageId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        boolean success = packageService.deletePackage(packageId);

        if (success==true) {
            map.put("status", 1);
            map.put("data", success);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Package not deleted");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/totalpricebyeventid/{eventId}")
    public ResponseEntity<?> getTotalPriceByEventId(@PathVariable int eventId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        double price = packageService.getTotalPriceByEventId(eventId);

        if (price>=0) {
            map.put("status", 1);
            map.put("data", price);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Package not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/packagecountbycategoryid/{categoryId}")
    public ResponseEntity<?> getPackageCountByCategoryId(@PathVariable int categoryId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        int count = packageService.getPackageCountByCategoryId(categoryId);

        if (count >= 0 ) {
            map.put("status", 1);
            map.put("data", count);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Packages list is not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

}
