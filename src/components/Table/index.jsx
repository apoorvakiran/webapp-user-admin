import React, { useState, useEffect } from "react";
import { Table } from "antd";

const TableComponent = props => {

  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, []);

  const { columns, data, rowSelection, onRow, showHeader } = props;
  return (
    < Table
      rowClassName={(record, index) =>
        index % 2 === 0 ? "table-row-light " : "table-row-dark"
      }
      key={data.id}
      columns={columns}
      // scroll={{ y: 1024, overflow: "auto" }}
      dataSource={data}
      pagination={{
        current: page,
        pageSize: 10,
        hideOnSinglePage: true,
        showSizeChanger: true,
      }}
      rowSelection={rowSelection}
      onRow={onRow}
      showHeader={showHeader}
      onChange={(page) => {
        setPage(page.current);
      }}
    />
  );
};

export default TableComponent;
