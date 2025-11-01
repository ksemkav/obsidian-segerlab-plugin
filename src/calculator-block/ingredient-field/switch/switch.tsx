import styles from "./switch.module.css";
import clsx from "clsx";

export const Switch = ({ checked = false }: { checked?: boolean }) => {
  return (
    <div className={clsx(styles.track, { [styles.checkedTrack]: checked })}>
      <div className={clsx(styles.thumb, { [styles.checkedThumb]: checked })}/>
    </div>
  );
};
