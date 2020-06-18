import styled from 'styled-components';
import React, { useState, ChangeEvent } from 'react';

// const Root = styled.select<{ bg: string }>`
// background-color: ${({ bg }) => bg};
const Root = styled.select`
  padding: 5px;
`;

interface Props {
  // color: string;
  initialValue: string;
  onChange?(option: string): void;
}

const OptionsSelect = ({ initialValue, onChange }: Props) => {
  const [selectValue, setSelectValue] = useState<string>(initialValue);
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);

    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <Root
      // bg={color}
      name="option"
      onChange={handleSelectChange}
      value={selectValue}
    >
      <option value="">--Please choose an option--</option>
      <option value="death">death</option>
      <option value="deathIncrease">deathIncrease</option>
      <option value="hospitalized">hospitalized</option>
      <option value="hospitalizedCumulative">hospitalizedCumulative</option>
      <option value="hospitalizedCurrently">hospitalizedCurrently</option>
      <option value="hospitalizedIncrease">hospitalizedIncrease</option>
      <option value="negative">negative</option>
      <option value="negativeIncrease">negativeIncrease</option>
      <option value="negativeScore">negativeScore</option>
      <option value="onVentilatorCumulative">onVentilatorCumulative</option>
      <option value="onVentilatorCurrently">onVentilatorCurrently</option>
      <option value="positive">positive</option>
      <option value="positiveCasesViral">positiveCasesViral</option>
      <option value="positiveIncrease">positiveIncrease</option>
      <option value="positiveScore">positiveScore</option>
      <option value="positiveTestsViral">positiveTestsViral</option>
      <option value="recovered">recovered</option>
      <option value="total">total</option>
      <option value="totalTestResults">totalTestResults</option>
      <option value="totalTestResultsIncrease">totalTestResultsIncrease</option>
      <option value="totalTestsViral">totalTestsViral</option>
    </Root>
  );
};

export default OptionsSelect;
