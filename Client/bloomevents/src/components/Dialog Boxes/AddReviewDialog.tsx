import {
  Dialog,
  DialogTitle,
  Box,
  TextField,
  DialogActions,
} from "@mui/material";
import ReviewService from "Services/ReviewService/ReviewService";
import CircularProgressItem from "components/CircularProgress/CircularProgressItem";
import ControlledRatings from "components/Ratings/ControlledRatings";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Review } from "types/Review";

function AddReviewDialog({
  openReview,
  handleClickCloseReview,
  userId,
  addToEventId,
  providerId,
}: any) {
  const [value, setValue] = useState<string | "">("");
  const [ratings, setRatings] = useState<number>(0);
  const [newReview, setNewReview] = useState<Review>({
    reviewId: 0,
    review: "",
    timestamp: "",
    rate: 0,
    userId: userId,
    providerId: providerId,
  });
  const [backdrop, setBackdrop] = useState<boolean>(false);

  useEffect(() => {
    setNewReview({
      reviewId: 0,
      review: value,
      timestamp: dayjs().format("DD-MMM-YYYY").toString(),
      rate: ratings,
      userId: userId,
      providerId: providerId,
    });
  }, [value, ratings]);

  const [token, setToken] = useState<any>();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setToken(JSON.parse(token));
    } else {
      setToken(null);
    }
  }, []);

  const addReview = (e: any) => {
    e.preventDefault();
    setBackdrop(true);
    // console.log(newReview);

    setTimeout(() => {
      // console.log(newReview);
      ReviewService.addReview(newReview, addToEventId, token).then(
        (res: any) => {
          console.log(res);
          if (res.data.status === 1) {
            setBackdrop(false);
            handleClickCloseReview();
            // toast.success("Successfully Deleted");
            window.location.reload();
          } else {
            toast.error(res.data.message);
          }
        }
      );
    }, 1000);
  };
  return (
    <div>
      <Dialog
        open={openReview}
        onClose={handleClickCloseReview}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="p-5">
        <DialogTitle id="alert-dialog-title">
          <h1 className="mb-3 text-3xl text-center">
            Add <span className="text-[#ffa537]">Review</span>
          </h1>
          <div className="my-5">
            <ControlledRatings setRatings={setRatings} ratings={ratings} />
          </div>

          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              label="Review"
              id="fullWidth"
              color="warning"
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </Box>
        </DialogTitle>

        <DialogActions>
          <button
            type="submit"
            onClick={addReview}
            className="react-hook-form-btn react-hook-form-btn-submit">
            {backdrop === true && (
              <>
                <div className="mr-3">
                  <CircularProgressItem />
                </div>
              </>
            )}
            Add Review
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddReviewDialog;
