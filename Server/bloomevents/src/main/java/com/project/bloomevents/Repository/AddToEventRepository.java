package com.project.bloomevents.Repository;

import com.project.bloomevents.Model.AddToEvent;
import com.project.bloomevents.Model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface AddToEventRepository extends JpaRepository<AddToEvent,Integer> {
    @Transactional
    @Modifying
    @Query("update AddToEvent a set a.reviewed = ?1 where a.addToEventId = ?2")
    int updateReviewed(boolean reviewed, int addToEventId);
    @Transactional
    @Modifying
    @Query("update AddToEvent a set a.isApproved = true where a.addToEventId = ?1")
    int approvePackage(int addToEventId);
    @Transactional
    @Modifying
    @Query("delete from AddToEvent a where a.addToEventId = ?1")
    int deletePackage(int addToEventId);
    @Transactional
    @Modifying
    @Query("update AddToEvent a set a.isPlaced = ?1 where a.event = ?2")
    int placePackages(boolean isPlaced, Event event);

    @Query(value = "SELECT COUNT(add_to_event_id) FROM bloomeventsdb.addtoevent WHERE event_id=?1", nativeQuery = true)
    int getPackageCountByEventId(int eventId);

    @Query(value = "SELECT * FROM bloomeventsdb.addtoevent WHERE event_id=?1", nativeQuery = true)
    List<AddToEvent> getPackagesByEventId(int eventId);

    @Query(value = "SELECT * FROM bloomeventsdb.addtoevent WHERE is_approved=0 AND is_placed=1 AND package_id IN " +
            "(select package_id FROM bloomeventsdb.packages WHERE provider_id=?1) ORDER BY add_to_event_id DESC", nativeQuery = true)
    List<AddToEvent> getPlacedPackagesByProviderId(int providerId);

    @Query(value = "SELECT * FROM bloomeventsdb.addtoevent WHERE is_approved=1 AND is_placed=1 AND package_id IN " +
            "(select package_id FROM bloomeventsdb.packages WHERE provider_id=?1) AND event_id NOT IN " +
            "(SELECT event_id FROM bloomeventsdb.booking)  ORDER BY add_to_event_id DESC", nativeQuery = true)
    List<AddToEvent> getApprovedPackagesByProviderId(int providerId);

    @Query(value = "SELECT * FROM bloomeventsdb.addtoevent WHERE is_approved=1 AND is_placed=1 AND package_id IN " +
            "(select package_id FROM bloomeventsdb.packages WHERE provider_id=?1) AND event_id IN " +
            "(SELECT event_id FROM bloomeventsdb.booking)  ORDER BY add_to_event_id DESC", nativeQuery = true)
    List<AddToEvent> getBookedPackagesByProviderId(int providerId);

    @Query(value = "SELECT COUNT(add_to_event_id) FROM bloomeventsdb.addtoevent WHERE event_id=?1 AND is_approved=true", nativeQuery = true)
    int getApprovedPackageCountByEventId(int eventId);

    @Query(value = "SELECT * FROM bloomeventsdb.addtoevent WHERE event_id IN " +
            "(SELECT event_id FROM bloomeventsdb.booking)", nativeQuery = true)
    List<AddToEvent> getAllBookedPackages();

    @Query(value = "SELECT COUNT(add_to_event_id) FROM bloomeventsdb.addtoevent WHERE is_placed=1 AND is_approved=0 AND package_id IN " +
            "(SELECT package_id FROM bloomeventsdb.packages WHERE provider_id IN " +
            "(SELECT provider_id FROM bloomeventsdb.provider WHERE user_id = ?1))", nativeQuery = true)
    int getRequestCountByUserId(int userId);

    @Query(value = "SELECT COUNT(add_to_event_id) FROM bloomeventsdb.addtoevent WHERE is_placed=1 AND is_approved=0 AND package_id IN " +
            "(SELECT package_id FROM bloomeventsdb.packages WHERE provider_id =?1) ", nativeQuery = true)
    int getRequestCountByProviderId(int providerId);
}
