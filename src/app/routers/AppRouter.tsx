import { createBrowserRouter,RouterProvider,} from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LibraryPage } from "../pages/LibraryPage";

export const AppRouter = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
    {
      path: "/biblioteca",
      element: <LibraryPage/>,
    },
    
  ]);

  return (      
    <RouterProvider router={router} />
  )
}
