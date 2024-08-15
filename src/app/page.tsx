
// import React from "react";
// import styles from "./page.module.css";
// import CustomForm from "../Components/Form"; // Import the form component

// export default function Home() {
//   return (
//     <main className={styles.main}>
//       <div>
//         <CustomForm />  {/* Use the form component */}
//       </div>
//     </main>
//   );
// }


// Page.tsx

import React from "react";
import styles from "./page.module.css";
import Ahly from "@/Components/Form";
import Date from "@/Components/Date";




const Page: React.FC = () => {
  return (
    <main className={styles.main}>
      <div>
        
        <Ahly />
       <br /><hr /><br />
        <Date />
      
      </div>
    </main>
  );
};

export default Page;
