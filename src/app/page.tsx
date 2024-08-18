
import React from "react";
import styles from "./page.module.css";
import Movies from "@/Components/Movies";

const Page: React.FC = () => {
 
  return (
    <main className={styles.main}>
      <div>
        
        <Movies />
      
      </div>
    </main>
  );
};

export default Page;
