"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface CourseSyntax {
  title: string;
  thumbnailLink: string;
  price: number;
  id: number;
  currencyCode: string;
}
// 1. Define types
interface AppContextType {
  CoursesInfo: CourseSyntax[];
  setCoursesInfo: (CoursesInfo: CourseSyntax[]) => void;

  firstIndex: number;
  setFirstIndex: (firstIndex: number) => void;

  lastIndex: number;
  setLastIndex: (lastIndex: number) => void;

  currentPage: number;
  setCurrentPage: (lastIndex: number) => void;

  providerRoute: string;
  setProviderRoute: (providerRoute: string) => void;
}

// 2. Create context with default empty values
const AppContext = createContext<AppContextType | undefined>(undefined);

let course: CourseSyntax[] = [];
let setCourse: Dispatch<SetStateAction<CourseSyntax[]>> = () => {};

// 3. Create provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [CoursesInfo, setCoursesInfo] = useState<CourseSyntax[]>([]);
  const [firstIndex, setFirstIndex] = useState<number>(0);
  const [lastIndex, setLastIndex] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [providerRoute, setProviderRoute] = useState<string>("");
  course = CoursesInfo;
  setCourse = setCoursesInfo;
  return (
    <AppContext.Provider
      value={{
        CoursesInfo,
        setCoursesInfo,
        firstIndex,
        setFirstIndex,
        lastIndex,
        setLastIndex,
        currentPage,
        setCurrentPage,

        providerRoute,
        setProviderRoute,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const coursesInfo = course;
export const setCourses = setCourse;

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return context;
}
