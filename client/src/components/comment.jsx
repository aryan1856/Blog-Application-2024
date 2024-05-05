import React, { useContext } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { URL } from '../url';
import { UserContext } from "../context/UserContext";

function Comment({ c }) {
    const { user } = useContext(UserContext);

    const deleteComment = async (id) => {
        try {
            await axios.delete(`${URL}/api/comments/${id}`, { withCredentials: true });
            window.location.reload(true);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="px-4 py-2 bg-gray-200 w-full md:max-w-xl lg:max-w-2xl xl:max-w-3xl rounded-lg my-2">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-600">
                    @{c.author}
                </h3>
                <div className="flex items-center space-x-4">
                    <p>{new Date(c.updatedAt).toLocaleDateString()}</p>
                    {user?._id === c?.userId &&
                        <div className="flex items-center space-x-2">
                            <p className="cursor-pointer" onClick={() => deleteComment(c._id)}><MdDelete /></p>
                        </div>
                    }
                </div>
            </div>
            <p className="px-4 mt-2">{c.comment}</p>
        </div>
    );
}

export default Comment;
