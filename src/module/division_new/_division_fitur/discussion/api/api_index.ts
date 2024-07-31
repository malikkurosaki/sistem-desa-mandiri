import getAllDiscussion from "./get/getAllDiscussion";
import getOneDiscussion from "./get/getOneDiscussion";
import createCommentDiscussion from "./post/createCommentDiscussion";
import createDiscussion from "./post/createDiscussion";
import deleteDiscussion from "./post/deleteDiscussion";
import updateDiscussion from "./post/updateDiscussion";

export const API_INDEX_DISCUSSION = [
   {
      path: "get-all-discussion",
      method: "GET",
      bin: getAllDiscussion,
   },
   {
      path: "get-one-discussion",
      method: "GET",
      bin: getOneDiscussion,
   },
   {
      path: "create-discussion",
      method: "POST",
      bin: createDiscussion,
   },
   {
      path: "create-comment-discussion",
      method: "POST",
      bin: createCommentDiscussion,
   },
   {
      path: "update-discussion",
      method: "POST",
      bin: updateDiscussion,
   },
   {
      path: "delete-discussion",
      method: "POST",
      bin: deleteDiscussion,
   },
];
