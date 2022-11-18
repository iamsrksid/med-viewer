import { gql } from "@apollo/client";

export const GET_ANNOTATION = gql`
  query LoadAnnotation($query: LoadAnnotationInput) {
    loadAnnotation(query: $query) {
      message
      success
      data {
        slideId
        type
        version
        originX
        originY
        left
        top
        width
        height
        fill
        stroke
        strokeWidth
        strokeLineCap
        strokeDashOffset
        strokeLineJoin
        strokeMiterLimit
        scaleX
        scaleY
        angle
        flipX
        flipY
        opacity
        visible
        backgroundColor
        fillRule
        paintFirst
        globalCompositeOperation
        skewX
        skewY
        rx
        ry
        hash
        text
        zoomLevel
        tag
        title
        x1
        y1
        x2
        y2
        points {
          y
          x
        }
        path
        area
        perimeter
        centroid
        end_points
        isAnalysed
        analysedROI
        classType
        isDeleted
        belongsToApp
        createdAt
        updatedAt
      }
    }
  }
`;

export const SAVE_ANNOTATION = gql`
  mutation AutoSaveAnnotation($body: CreateAnnotationInput!) {
    autoSaveAnnotation(body: $body) {
      success
      message
      data {
        slideId
        type
        version
        originX
        originY
        left
        top
        width
        height
        fill
        stroke
        strokeWidth
        strokeLineCap
        strokeDashOffset
        strokeLineJoin
        strokeMiterLimit
        scaleX
        scaleY
        angle
        flipX
        flipY
        opacity
        visible
        backgroundColor
        fillRule
        paintFirst
        globalCompositeOperation
        skewX
        skewY
        rx
        ry
        hash
        text
        zoomLevel
        tag
        title
        x1
        y1
        x2
        y2
        points {
          x
          y
        }
        path
        area
        perimeter
        centroid
        end_points
        isAnalysed
        analysedROI
        classType
        isDeleted
        belongsToApp
        createdAt
        updatedAt
      }
    }
  }
`;

export const UPDATE_ANNOTATION = gql`
  mutation UpdateAnnotation($body: UpdateAnnotationInput) {
    updateAnnotation(body: $body) {
      data {
        slideId
        type
        version
        originX
        originY
        left
        top
        width
        height
        fill
        stroke
        strokeWidth
        strokeLineCap
        strokeDashOffset
        strokeLineJoin
        strokeMiterLimit
        scaleX
        scaleY
        angle
        flipX
        flipY
        opacity
        visible
        backgroundColor
        fillRule
        paintFirst
        globalCompositeOperation
        skewX
        skewY
        rx
        ry
        hash
        text
        zoomLevel
        tag
        title
        x1
        y1
        x2
        y2
        points {
          x
          y
        }
        path
        area
        perimeter
        centroid
        end_points
        isAnalysed
        analysedROI
        classType
        isDeleted
        belongsToApp
        createdAt
        updatedAt
      }
      message
      success
    }
  }
`;

export const DELETE_ANNOTATION = gql`
  mutation DeleteAnnotation($body: DeleteAnnotationInput) {
    deleteAnnotation(body: $body) {
      success
      message
    }
  }
`;
