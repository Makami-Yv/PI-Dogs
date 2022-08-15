//import styles from "./Home.module.css"
import { Dogs } from "../Dogs/Dogs"

export function Home() {
    return (
        <div className={styles.home_container}>
            <Dogs />
        </div>
    );
}