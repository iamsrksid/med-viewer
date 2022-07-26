import { fabric } from "openseadragon-fabricjs-overlay";
import md5 from "md5";

// create annotaion message for the feed
export const createAnnotationMessage = ({
  shape,
  viewer,
  user,
  annotation,
}) => {
  if (!viewer || !shape) return null;

  const message = {
    username: user ? `${user.firstName} ${user.lastName}` : "",
    object: shape,
    image: null,
  };

  // if annotation data is available
  // else create a new one
  if (annotation) {
    const {
      hash,
      text,
      zoomLevel,
      points,
      timeStamp,
      area,
      perimeter,
      cnetroid,
      endPoints,
      isAnalysed,
    } = annotation;

    message.object.set({
      hash,
      text,
      zoomLevel,
      points,
      timeStamp,
      area,
      perimeter,
      cnetroid,
      endPoints,
      isAnalysed,
    });
  } else {
    const timeStamp = Date.now();
    const hash = md5(shape + timeStamp);

    // message.image = await getCanvasImage(viewerId);
    message.object.set({
      timeStamp,
      hash,
      zoomLevel: viewer.viewport.getZoom(),
      text: "",
    });
  }

  return message;
};

// create annotation from the annotation data
export const createAnnotation = (annotation) => {
  let shape;
  switch (annotation.type) {
    case "ellipse":
      shape = new fabric.Ellipse({
        left: annotation.left,
        top: annotation.top,
        width: annotation.width,
        height: annotation.height,
        color: annotation.color,
        fill: annotation.fill,
        stroke: annotation.stroke,
        strokeWidth: annotation.strokeWidth,
        strokeUniform: annotation.strokeUniform,
        rx: annotation.rx,
        ry: annotation.ry,
        angle: annotation.angle,
      });
      break;

    case "rect":
      shape = new fabric.Rect({
        left: annotation.left,
        top: annotation.top,
        width: annotation.width,
        height: annotation.height,
        color: annotation.color,
        fill: annotation.fill,
        stroke: annotation.stroke,
        strokeWidth: annotation.strokeWidth,
        strokeUniform: annotation.strokeUniform,
      });
      break;

    case "polygon":
      shape = new fabric.Polygon(annotation.points, {
        stroke: annotation.stroke,
        strokeWidth: annotation.strokeWidth,
        fill: annotation.fill,
        strokeUniform: annotation.strokeUniform,
      });
      break;

    case "path":
      shape = new fabric.Path(annotation.path, {
        color: annotation.color,
        stroke: annotation.stroke,
        strokeWidth: annotation.strokeWidth,
        strokeUniform: annotation.strokeUniform,
        fill: annotation.fill,
      });
      break;

    case "line":
      shape = new fabric.Line(annotation.points, {
        color: annotation.color,
        stroke: annotation.stroke,
        strokeWidth: annotation.strokeWidth,
        strokeUniform: annotation.strokeUniform,
        fill: annotation.fill,
      });
      break;

    default:
      shape = null;
  }
  return shape;
};

// add annotation to the canva s
export const addAnnotationsToCanvas = ({
  canvas,
  viewer,
  user,
  annotations = [],
}) => {
  if (!canvas || !viewer || annotations.length > 0) return null;
  // remove render on each add annotation
  const originalRender = canvas.renderOnAddRemove;
  canvas.renderOnAddRemove = false;

  const feed = [];

  annotations.forEach((annotation) => {
    const shape = createAnnotation(annotation);

    // add shape to canvas and to activity feed
    canvas.add(shape);

    const message = createAnnotationMessage({
      shape,
      viewer,
      annotation,
      user,
    });
    feed.push(message);
  });

  // restore render on each add annotation
  canvas.renderOnAddRemove = originalRender;
  canvas.requestRenderAll();
  viewer.viewport.zoomBy(1.01);

  return feed;
};

// create contour(annotation) from the analysed data
export const createContour = ({ contour, color, left, top }) => {
  const points = contour.map((point) => ({
    x: point[0][0] + left,
    y: point[0][1] + top,
  }));
  return new fabric.Polygon(points, {
    stroke: "black",
    strokeWidth: 1.2,
    fill: color ? `${color.hex}80` : "",
    strokeUniform: true,
  });
};

// create contours(annotation) around cell from analysis data
export const createContours = async ({
  canvas,
  viewer,
  contours,
  color,
  left,
  top,
}) => {
  if (!canvas || !contours || contours.length === 0) return null;

  const {
    roi_detected_list,
    avg_area,
    avg_permieter,
    max_area,
    min_area,
    max_permieter,
    min_perimeter,
    ratio,
  } = contours;

  const feed = [];

  roi_detected_list[0].forEach((roi) => {
    const shape = createContour({ contour: roi, color, left, top });
    canvas.add(shape);

    const message = createAnnotationMessage({ shape, viewer });

    message.object.set({
      isAnalysed: true,
    });
    feed.push(message);
  });

  return feed;
};
