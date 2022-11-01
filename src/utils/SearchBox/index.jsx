import { Input } from "antd";
import { useEffect, useState } from "react";

const SearchBox = props => {
    const [searchedText, setSearchedText] = useState("");

    useEffect(() => {
        props.func(searchedText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchedText]);

    return (

        <Input.Search
            placeholder="Search here...."
            className="searchBoxStyle"
            onSearch={(value) => {
                setSearchedText(value);
            }}
            onChange={(event) => {
                setSearchedText(event.target.value);
            }}
        />
    );
};

export default SearchBox;