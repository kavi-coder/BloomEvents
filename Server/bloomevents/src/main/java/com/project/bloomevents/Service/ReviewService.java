package com.project.bloomevents.Service;

import com.project.bloomevents.DTO.ReviewDTO;

import java.util.List;

public interface ReviewService {
    List<ReviewDTO> getAllReviews();
    ReviewDTO addReview(ReviewDTO review, int addToEventId);
    boolean deleteReview(int reviewId);

    List<ReviewDTO> getReviewsByProviderId(int providerId);

    int getReviewCountByProviderId(int providerId);
}
