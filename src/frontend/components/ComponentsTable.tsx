import React from 'react';
import './ComponentsTable.css';
import { IComponent } from '../../common/models/Component';
import { ComponentProperties } from './ComponentProperties';

export interface IProps {
  components: IComponent[];
}

// tslint:disable-next-line:variable-name
export const ComponentsTable = (props: IProps) => {
  console.log('In ComponentsTable');
  console.log(props.components);
  return (
    <table className="componentsTable">
      <thead>
        <tr>
          <th>Id</th>
          <th>Class</th>
          <th>Tag</th>
          <th>Description</th>
          <th>Manufacturer</th>
          <th>Addition Properties</th>
        </tr>
      </thead>
      <tbody>
        {props.components.map((comp) => {
          return (
            <tr key={comp.id}>
              <td>{comp.id}</td>
              <td>{comp.className}</td>
              <td>{comp.tag}</td>
              <td>{comp.description}</td>
              <td>{comp.manufacturer}</td>
              <td><ComponentProperties properties={comp.properties} /></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
