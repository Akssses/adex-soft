import React from "react";
import s from "./VideoBlock.module.scss";

export default function VideoBlock() {
  const videoSrc = "./assets/video/promo.mp4";

  return (
    <section className={s.videoBlock}>
      <div className={`${s.inner} container`}>
        <div className={s.playerWrapper}>
          <video className={s.video} src={videoSrc} controls />
        </div>
      </div>
    </section>
  );
}
