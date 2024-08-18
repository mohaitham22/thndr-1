
import React from "react";
import styles from "./page.module.css";
import Movies from "@/Components/Movies";
// import Search from "antd/es/transfer/search";

const Page: React.FC = () => {
 
  return (
    <main className={styles.main}>
      <div>
        
        {/* <Search /> */}

        <Movies />
      
      </div>
    </main>
  );
};

export default Page;
