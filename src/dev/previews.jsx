import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import BookCreate from "../components/book/BookCreate";
import BookEdit from "../components/book/BoookEdit";
import BookShow from "../components/book/BookShow";
import BookList from "../components/book/BookList";
import App from "../App";

const ComponentPreviews = () => {
  return (
      <Previews palette={<PaletteTree/>}>
        <ComponentPreview path="/BookCreate">
          <BookCreate/>
        </ComponentPreview>
        <ComponentPreview
            path="/BookEdit">
          <BookEdit/>
        </ComponentPreview>
        <ComponentPreview
            path="/BookShow">
          <BookShow/>
        </ComponentPreview>
        <ComponentPreview
            path="/BookList">
          <BookList/>
        </ComponentPreview>
        <ComponentPreview
            path="/App">
          <App/>
        </ComponentPreview>
      </Previews>
  );
};

export default ComponentPreviews;
