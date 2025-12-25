import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomSelect from '@/components/ui/custom-select/custom-select';
import i18n from '@/translation';
import { I18nextProvider } from 'react-i18next';

test('CustomSelect renders translated yes/no for options with value yes/no in jp', async () => {
  await i18n.changeLanguage('jp');
  const options = [
    { value: '', label: 'selectAnOption' },
    { value: 'yes', label: 'yes' },
    { value: 'no', label: 'no' },
  ];
  render(
    <I18nextProvider i18n={i18n}>
      <CustomSelect name="test" label="Test" value={''} onChange={() => {}} options={options} />
    </I18nextProvider>
  );

  // Option elements should contain translated text
  expect(screen.getByText('オプションを選択')).toBeTruthy();
  expect(screen.getByText('はい')).toBeTruthy();
  expect(screen.getByText('いいえ')).toBeTruthy();
});
