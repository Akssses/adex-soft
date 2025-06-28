"use client";
import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import s from "./Achievements.module.scss";

const achievements = [
  {
    number: "50+",
    label: "Successful Projects",
    description: "Completed projects in Web3 and blockchain",
    endValue: 50,
  },
  {
    number: "30+",
    label: "Team Experts",
    description: "Professionals with crypto industry experience",
    endValue: 30,
  },
  {
    number: "5+",
    label: "Years of Experience",
    description: "Working with blockchain technologies and Web3",
    endValue: 5,
  },
  {
    number: "15+",
    label: "Countries Present",
    description: "Geography of our clients and partners",
    endValue: 15,
  },
];

const Counter = ({ value, isInView }) => {
  const [count, setCount] = React.useState(0);
  const countRef = useRef(count);
  countRef.current = count;

  useEffect(() => {
    let frame;
    const startTime = Date.now();
    const duration = 2000; // 2 seconds

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      if (progress < 1) {
        setCount(Math.floor(progress * value));
        frame = requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    };

    if (isInView) {
      frame = requestAnimationFrame(updateCount);
    }

    return () => cancelAnimationFrame(frame);
  }, [value, isInView]);

  return <span>{count}+</span>;
};

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={s.achievements} ref={ref}>
      <div className={s.container}>
        <motion.div
          className={s.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Our Achievements</h2>
          <p>Our work in numbers</p>
        </motion.div>

        <div className={s.grid}>
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className={s.achievementCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={s.number}>
                <Counter value={achievement.endValue} isInView={isInView} />
              </div>
              <h3>{achievement.label}</h3>
              <p>{achievement.description}</p>
              <div className={s.decoration} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
