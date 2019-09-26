export interface BlurEvent {
  nativeEvent: {};
}

export interface FocusEvent {
  nativeEvent: {};
}

export interface ScrollEvent {
  nativeEvent: {
    contentOffset: {
      x: number;
      y: number;
    };
    contentSize: {
      height: number;
      width: number;
    };
    layoutMeasurement: {
      height: number;
      width: number;
    };
  };
  timeStamp: number;
}

export interface ViewLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ViewLayoutEvent {
  nativeEvent: {
    layout: ViewLayout;
  };
  timeStamp: number;
}
