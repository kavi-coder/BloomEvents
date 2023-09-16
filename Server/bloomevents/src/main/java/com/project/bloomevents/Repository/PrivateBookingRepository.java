package com.project.bloomevents.Repository;

import com.project.bloomevents.Model.PrivateBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PrivateBookingRepository extends JpaRepository<PrivateBooking, Integer> {
    @Transactional
    @Modifying
    @Query("delete from PrivateBooking p where p.privateBookingId = ?1")
    int deleteByPrivateBookingIdEquals(int privateBookingId);
    @Query(value = "SELECT * FROM bloomeventsdb.private_bookings WHERE provider_id=?1", nativeQuery = true)
    List<PrivateBooking> getPrivateBookingsByProviderId(int providerId);
}
