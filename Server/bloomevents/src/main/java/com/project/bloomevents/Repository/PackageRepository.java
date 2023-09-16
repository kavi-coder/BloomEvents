package com.project.bloomevents.Repository;

import com.project.bloomevents.Model.Packages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PackageRepository extends JpaRepository<Packages, Integer> {
    @Transactional
    @Modifying
    @Query("delete from Packages p where p.packageId = ?1")
    int deletePackage(int packageId);
    @Transactional
    @Modifying
    @Query("update Packages p set p.packageName = ?1, p.price = ?2, p.description = ?3 where p.packageId = ?4")
    int updatePackage(String packageName, double price, String description, int packageId);
    @Query(value = "SELECT * FROM bloomeventsdb.packages WHERE provider_id=?1", nativeQuery = true)
    List<Packages> getPackagesByProviderId(int providerId);

    @Query(value = "SELECT COUNT(package_id) FROM bloomeventsdb.packages WHERE provider_id=?1", nativeQuery = true)
    int getPackageCount(int providerId);

    @Query(value = "SELECT SUM(price) FROM bloomeventsdb.packages WHERE package_id IN " +
            "(SELECT package_id FROM bloomeventsdb.addtoevent WHERE event_id=?1)", nativeQuery = true)
    double getTotalPriceByEventId(int eventId);

    @Query(value = "SELECT COUNT(package_id) FROM bloomeventsdb.packages WHERE provider_id IN " +
            "(SELECT provider_id FROM bloomeventsdb.provider WHERE category_id = ?1)", nativeQuery = true)
    int getPackageCountByCategoryId(int categoryId);
}
