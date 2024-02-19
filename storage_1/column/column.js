import styles from "@/app/page.module.css"

export default function Column({columnId, value}) {  
  return (
    <div className="col col-auto" id={columnId}>
        <div className={styles.box} id={`box_${columnId}`}>{value}</div>
    </div>
  );
}

{/* <input type="text" className={styles.input} disabled/> */}

