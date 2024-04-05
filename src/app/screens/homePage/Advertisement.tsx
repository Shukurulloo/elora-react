import React from "react";

export default function Advertisement() {
return (
    <div className="ads-restaurant-frame">
 {/* buyerda container qo'yilmaganini sababi bizga to'liq ekran kerak */}
        <video 
            className={"ads-video"}
            autoPlay={true}
            loop
            muted
            playsInline
            data-video-media=""
            >
                <source type="video/mp4" src="video/burak-ads.mp4"/>
        </video>
    </div>
    );
}