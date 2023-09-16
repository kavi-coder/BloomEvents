package com.project.bloomevents.Repository;

import com.project.bloomevents.Model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Integer> {
    @Query(value = "SELECT * FROM bloomeventsdb.booking WHERE event_id=?1", nativeQuery = true)
    Booking getBookingDetailsByEventId(int eventId);
}
