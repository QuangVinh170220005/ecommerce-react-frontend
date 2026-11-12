
import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import API_URL from "../../config";
import axios from "axios";

function Rate(props){
    const [rating, setRating] = useState(0)
    const handleRating = (rate) =>{

        console.log('giá trị và chọn', rate)

        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('Auth'))

        const url = `${API_URL}/api/blog/rate/add`
        
        if(!token){
            alert('Vui lòng đăng nhập để đánh giá');
            return
        }
        const config = {
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json",
            },
        }
            const formData = new FormData()
            formData.append('rate', rate)
            formData.append('id_blog', props.blogId)
            formData.append('id_user', user.id)

            axios.post(url, formData, config)
            .then((res) =>{
                alert('đánh giá thành công')
                setRating(rate)
            })
            .catch(err => console.log(err))
    }
    return(
        <div>
            <Rating
                onClick={handleRating}
                initialValue={rating}
                size={35}
                transition
                fillColor="gold"
                emptyColor="gray"
            />
    </div>
  );
}
export default Rate