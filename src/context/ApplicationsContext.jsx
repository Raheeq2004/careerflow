import { createContext, useState, useEffect, useContext } from "react";
import { applicationsRepository } from "../features/applications/data/applicationsRepository";

const ApplicationsContext = createContext(null);
//genuinely is a JavaScript object, automatically built  by createContext()
//we are accessing the Provider property that automatically exists on this object, and using it as a component in JSX.

export function ApplicationsProvider({ children }) {
  //children is for render
  //new component built, whose entire job is to own the state and make it available to everything nested inside it

  const [applications, setApplications] = useState(() =>
    applicationsRepository.getAll(),
  );

  useEffect(() => {
    applicationsRepository.saveAll(applications);
  }, [applications]);

  return (
    //component to return the edited data from the useffect to everything inside it
    <ApplicationsContext.Provider value={{ applications, setApplications }}>
      {children}
    </ApplicationsContext.Provider>
    //children renders whatever was passed in
  );
}

export function useApplications() {
  //any page that wants to reach data , calls useapplication
  return useContext(ApplicationsContext);
}

//use context , we use it to read data
// create context , the channel we use to pass data to any component inside the enviroment , without needing to pass it as a prop

/*Any page that needs applications just calls useApplications(), and this function returns applications and setApplications back to it — without the page ever needing to know where ApplicationsProvider lives, or how the data actually got to it. */
