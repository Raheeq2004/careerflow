import styles from "./StatCard.module.css";

function StatCard({ number, label }) {
  return (
    <div className={styles.statCard}>
      <p className={styles.statNumber}>{number}</p>
      <p className={styles.statLabel}>{label}</p>
    </div>
  );
}

export default StatCard;

/**function StatCard({ number, label }) { — this component takes exactly 2 props, since (as we worked out together) only two things ever change between the three stat boxes: the number itself, and the label describing it. */
