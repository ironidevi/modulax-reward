"use client";

import {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { Button } from "./button";
import { X } from "lucide-react";

// Generic Context Interface
export interface IBottomSheetContext<T> {
  state: {
    key: string;
    open: boolean;
    data: T | null;
  };
  scaleableRef: HTMLElement | null;
  setScaleableRef: (ref: HTMLElement | null) => void;
  handleOpen: (data: T, key?: string) => void;
  handleClose: () => void;
}

// Provider Props
interface BottomSheetProviderProps<T> {
  children: React.ReactNode;
}

export function createBottomSheetContext<T>() {
  return createContext<IBottomSheetContext<T> | undefined>(undefined);
}
export const BottomSheetContext = createBottomSheetContext<any>();
export const useBottomSheetContext = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error(
      "useBottomSheetContext must be used within a BottomSheetProvider"
    );
  }
  return context;
};

export const BottomSheetProvider: FC<BottomSheetProviderProps<any>> = ({
  children,
}) => {
  const [scaleableRef, setScaleableRef] = useState<HTMLElement | null>(null);
  const [state, setState] = useState({
    key: "default",
    open: false,
    data: null,
  });

  const handleClose = () => {
    setState((prev) => ({ ...prev, open: false }));
  };

  const handleOpen = (data: any, key: string = "default") => {
    setState({ key, open: true, data });
  };

  return (
    <BottomSheetContext.Provider
      value={{
        state,
        handleOpen,
        scaleableRef,
        setScaleableRef,
        handleClose,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};

interface ModalBottomSheetProps {
  children: React.ReactNode;
}

const ModalBottomSheet = ({ children }: ModalBottomSheetProps) => {
  const { state, scaleableRef, handleClose } = useBottomSheetContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !scaleableRef) return;

    const tl = gsap.timeline({
      defaults: { duration: 0.3, ease: "power2.inOut" },
    });

    if (state.open) {
      tl.to(scaleableRef, {
        scale: 0.925,
        borderRadius: "20px",
      })
        .to(
          ref.current,
          {
            display: "block",
          },
          "-=0.3"
        )
        .to(
          "#mbs-backdrop",
          {
            opacity: 1,
          },
          "-=0.3"
        )
        .to(
          "#mbs-content",
          {
            translateY: "0%",
            opacity: 1,
          },
          "-=0.3"
        );
    } else {
      tl.to("#mbs-content", {
        translateY: "100%",
        opacity: 0,
      })
        .to(
          "#mbs-backdrop",
          {
            opacity: 0,
          },
          "-=0.3"
        )
        .to(
          ref.current,
          {
            display: "none",
          },
          "-=0.3"
        )
        .to(
          scaleableRef,
          {
            scale: 1,
            borderRadius: "0px",
          },
          "-=0.3"
        );
    }
  }, [state.open, ref.current]);

  return (
    <div ref={ref} className="fixed inset-0 z-50 hidden">
      <div
        id="mbs-backdrop"
        className="fixed inset-0 bg-foreground/50 z-10 opacity-0"
        onClick={handleClose}
      ></div>
      <div
        id="mbs-content"
        className="absolute bottom-0 left-0 right-0 z-20 bg-background p-4 rounded-t-[20px] shadow-lg w-screen opacity-0 overflow-x-hidden overflow-y-scroll"
        style={{
          height: "calc(100vh - 48px)",
        }}
      >
        <Button
          className="absolute top-4 right-4"
          variant="secondary"
          onClick={handleClose}
        >
          <div className="px-2">
            <X />
          </div>
        </Button>
        {state.data && children}
      </div>
    </div>
  );
};

export default ModalBottomSheet;
