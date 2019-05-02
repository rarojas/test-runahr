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
import moment from 'moment';

interface Props {
  getReport: Function;
  clockings: Clocking[];
}

const columns: Array<TableColumn> = [
  {
    Header: 'Date',
    accessor: 'time',
    Cell: (props: any) => <span>{moment(props.value).format('L')}</span>
  },
  {
    Header: 'Time',
    accessor: 'time',
    Cell: (props: any) => <span>{moment(props.value).format('LT')}</span>
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
              data={clockings}
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
