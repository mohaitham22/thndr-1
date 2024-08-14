
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
import CustomForm from "../Components/Form";  // Import the form component

const Page: React.FC = () => {
  return (
    <main className={styles.main}>
      <div>
        <CustomForm />  {/* Render the form component */}
      </div>
    </main>
  );
};

export default Page;
