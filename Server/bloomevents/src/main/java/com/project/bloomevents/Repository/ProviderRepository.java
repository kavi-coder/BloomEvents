package com.project.bloomevents.Repository;

import com.project.bloomevents.Model.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ProviderRepository extends JpaRepository<Provider,Integer> {
    @Transactional
    @Modifying
    @Query("update Provider p set p.rating = ?1 where p.providerId = ?2")
    int UpdateRatings(double rating, int providerId);

    @Transactional
    @Modifying
    @Query("delete from Provider p where p.providerId = ?1")
    int deleteProvider(int providerId);
    @Transactional
    @Modifying
    @Query("""
            update Provider p set p.businessName = ?1, p.district = ?2, p.description = ?3, p.mobile = ?4, p.facebook = ?5, p.instagram = ?6, p.web = ?7
            where p.providerId = ?8""")
    int updateProvider(String businessName, String district, String description, String mobile, String facebook, String instagram, String web, int providerId);
    @Query(value = "SELECT * FROM bloomeventsdb.provider WHERE provider_id = ?1 LIMIT 1", nativeQuery = true)
    Provider getProviderById(int providerId);

    @Query(value = "SELECT * FROM bloomeventsdb.provider WHERE provider_id = (SELECT provider_id FROM bloomeventsdb.packages WHERE package_id=?1)", nativeQuery = true)
    Provider getProviderByPackageId(int packageId);
    @Query(value = "SELECT * FROM bloomeventsdb.provider WHERE user_id = ?1 ", nativeQuery = true)
    List<Provider> getProvidersByUserId(int userId);

    @Query(value = "SELECT COUNT(provider_id) FROM bloomeventsdb.provider WHERE category_id = ?1 ", nativeQuery = true)
    int getProviderCountByCategoryId(int categoryId);

}
