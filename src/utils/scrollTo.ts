// @ts-nocheck
// scrollTo.js

import { animateScroll } from "./animateScroll";

const logError = () =>
  console.error(
    `Invalid element, are you sure you've provided element id or react ref?`
  );

const getElementPosition = (element) => element.offsetTop;

export const scrollTo = ({
  id,
  ref = null,
  duration = 1000,
}: {
  id: any;
  ref: any;
  duration: any;
}) => {
  // the position of the scroll bar before the user clicks the button
  const initialPosition = window.scrollY;

  // decide what type of reference that is
  // if neither ref or id is provided  set element to null
  const element = ref ? ref.current : id ? document.getElementById(id) : null;

  if (!element) {
    // log error if the reference passed is invalid
    logError();
    return;
  }

  const target =
  getElementPosition(element) - window.innerHeight + element.offsetHeight + 100; // + 32;
  
  console.log('target: ', target);
  animateScroll({
    targetPosition: target,
    initialPosition,
    duration,
  });
};
