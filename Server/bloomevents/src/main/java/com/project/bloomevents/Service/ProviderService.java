package com.project.bloomevents.Service;

import com.project.bloomevents.DTO.ProviderDTO;

import java.util.List;

public interface ProviderService {
    List<ProviderDTO> getAllProviders();

    ProviderDTO addProvider(ProviderDTO providerdata);

    ProviderDTO getProviderById(int providerId);

    ProviderDTO getProviderByPackageId(int packageId);

    List<ProviderDTO> getProvidersByUserId(int userId);

    ProviderDTO updateProvider(ProviderDTO providerData);


    boolean deleteProvider(int providerId);

    int getProviderCountByCategoryId(int categoryId);
}
