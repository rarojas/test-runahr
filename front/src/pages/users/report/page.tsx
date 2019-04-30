import React from 'react';
import {
  Column
  //@ts-ignore
} from 'styled-bootstrap-components';
import {
  ContainerFull,
  RowCentered
} from '../../../components/layout/Forms/Layouts';
import ReactTable, { Column as TableColumn } from 'react-table';
import Clocking from '../../admin/clocking/page';
import { List } from 'immutable';

interface Props {
  getReport: Function;
  clockings: List<Clocking>;
}

const columns: Array<TableColumn> = [
  {
    Header: 'Date',
    accessor: 'date',
    Cell: (props: any) => <span className="number">{props.value}</span>
  },
  {
    Header: 'Time',
    accessor: 'date',
    Cell: (props: any) => <span className="number">{props.value}</span>
  },
  {
    Header: 'Type',
    accessor: 'type',
    Cell: (props: any) => <span className="number">{props.value}</span>
  }
];

export default class ReportPage extends React.Component<Props> {
  componentDidMount() {
    this.props.getReport();
  }

  render() {
    const { clockings } = this.props;
    return (
      <ContainerFull fluid>
        <RowCentered>
          <Column>
            <ReactTable
              data={clockings.toArray()}
              columns={columns}
              pageSize={10}
              pageSizeOptions={[10]}
            />
          </Column>
        </RowCentered>
      </ContainerFull>
    );
  }
}
