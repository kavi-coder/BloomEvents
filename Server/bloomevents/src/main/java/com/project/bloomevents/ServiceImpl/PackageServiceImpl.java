package com.project.bloomevents.ServiceImpl;

import com.project.bloomevents.DTO.AddToEventDTO;
import com.project.bloomevents.DTO.PackageDTO;
import com.project.bloomevents.Model.AddToEvent;
import com.project.bloomevents.Model.Packages;
import com.project.bloomevents.Repository.PackageRepository;
import com.project.bloomevents.Service.PackageService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PackageServiceImpl implements PackageService {
    @Autowired
    private PackageRepository packageRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AddToEventServiceImpl addToEventService;

    @Override
    public List<PackageDTO> getAllpackages() {
        try{
            List<Packages> list = packageRepo.findAll();
            return modelMapper.map(list, new TypeToken<List<PackageDTO>>() {
            }.getType());
        }
        catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }

    @Override
    public int getPackageCount(int providerId) {
        try{
            int count = packageRepo.getPackageCount(providerId);
//            System.out.println(count);
            if (count>=0){
                return count;
            }
            else{
                return -2;
            }
        }
        catch(Exception e){
            System.out.println(e.toString());
            return -1;
        }
    }

    @Override
    public List<PackageDTO> getPackagesByProviderId(int providerId) {
        try{
            List<Packages> list = packageRepo.getPackagesByProviderId(providerId);
            return modelMapper.map(list, new TypeToken<List<PackageDTO>>() {
            }.getType());
        }
        catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }

    @Override
    public PackageDTO getPackageByPackageId(int packageId) {
        try{
            //List<Packages> list = packageRepo.getPackagesByProviderId(packageId);
            Packages pckge=packageRepo.getReferenceById(packageId);
            return modelMapper.map(pckge, new TypeToken<PackageDTO>() {
            }.getType());
        }
        catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }

    @Override
    public PackageDTO addPackage(PackageDTO packageData) {
        try{
            Packages newPackage=modelMapper.map(packageData, Packages.class);
            Packages pckge=packageRepo.save(newPackage);
            return modelMapper.map(pckge, new TypeToken<PackageDTO>() {
            }.getType());
        }
        catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }

    @Override
    public PackageDTO updatePackage(int packageId, PackageDTO packageData) {
        try{
            int count=packageRepo.updatePackage(packageData.getPackageName(),packageData.getPrice(),packageData.getDescription(),packageId);
            if(count==1){
                return getPackageByPackageId(packageData.getPackageId());
            }
            else{
                return null;
            }
        }
        catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }

    @Override
    public boolean deletePackage(int packageId) {
        try{
            PackageDTO pckge=getPackageByPackageId(packageId);
            if(pckge!=null){
                int count = packageRepo.deletePackage(packageId);
                if(count==1){
                    return true;
                }
                return false;
            }
            return false;
        }
        catch(Exception e){
            System.out.println(e.toString());
            return false;
        }
    }

    @Override
    public double getTotalPriceByEventId(int eventId) {
        try{
            List<AddToEventDTO> pckgeList=addToEventService.getPackagesByEventId(eventId);
            if(pckgeList!=null){
                double sum=0;
                for(AddToEventDTO a:pckgeList){
                    double quantity=a.getQuantity();
                    double pckgePrice=getPackageByPackageId(a.getPackagesPackageId()).getPrice();

                    sum=sum+(quantity*pckgePrice);
                }
                return sum;
            }
            return -1;
//            double price=packageRepo.getTotalPriceByEventId(eventId);
//            if(price>=0){
//                return price;
//            }
//            else{
//                return -1;
//            }
        }
        catch(Exception e){
            System.out.println(e.toString());
            return -1;
        }
    }

    @Override
    public int getPackageCountByCategoryId(int categoryId) {
        try{
            int count = packageRepo.getPackageCountByCategoryId(categoryId);
            if (count>=0){
                return count;
            }
            return -1;
        }
        catch(Exception e){
            System.out.println(e.toString());
            return -1;
        }
    }
}
