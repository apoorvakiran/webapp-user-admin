import React, { useState, useEffect } from "react";
import { Table, Radio } from "antd";

const TableComponent = props => {
  const { columns, data, rowSelection, onRow, showHeader } = props;
  return (
    < Table
      rowClassName={(record, index) =>
        index % 2 === 0 ? "table-row-light " : "table-row-dark"
      }
      key={data.id}
      columns={columns}
      scroll={{ y: 1024, overflow: "auto" }}
      dataSource={data}
      pagination={{
        pageSize: 10,
        hideOnSinglePage: true,
        showSizeChanger: true,
      }}
      rowSelection={rowSelection}
      onRow={onRow}
      showHeader={showHeader}
    />
  );
};

export default TableComponent;
