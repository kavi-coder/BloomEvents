package com.project.bloomevents.Repository;

import com.project.bloomevents.Model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Integer> {
    @Transactional
    @Modifying
    @Query("delete from Review r where r.reviewId = ?1")
    int deleteReview(int reviewId);

    @Query(value = "SELECT * FROM bloomeventsdb.review WHERE review_id = ?1", nativeQuery = true)
    Review getReviewById(int reviewId);

    @Query(value = "SELECT * FROM bloomeventsdb.review WHERE provider_id = ?1", nativeQuery = true)
    List<Review> getReviewsByProviderId(int providerId);

    @Query(value = "SELECT COUNT(review_id) FROM bloomeventsdb.review WHERE provider_id = ?1", nativeQuery = true)
    int getReviewCountByProviderId(int providerId);

    @Query(value = "SELECT SUM(rate) FROM bloomeventsdb.review WHERE provider_id = ?1", nativeQuery = true)
    double getReviewSumByProviderId(int providerId);
}
