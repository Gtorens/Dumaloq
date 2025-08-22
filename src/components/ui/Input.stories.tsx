// import type { Meta, StoryObj } from '@storybook/react'; // Закомментировано для сборки без Storybook
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'tel', 'number'],
    },
    error: {
      control: { type: 'text' },
    },
    required: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    onChange: { action: 'changed' },
    onBlur: { action: 'blurred' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    error: 'Username is already taken',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'This field is disabled',
    disabled: true,
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
};

export const Phone: Story = {
  args: {
    label: 'Phone Number',
    type: 'tel',
    placeholder: '+7 (999) 123-45-67',
  },
};

export const Number: Story = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: 'Enter your age',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input label="Default Input" placeholder="Default state" />
      <Input label="Required Field" placeholder="Required field" required />
      <Input label="With Error" placeholder="Error state" error="This field has an error" />
      <Input label="Disabled Field" placeholder="Disabled state" disabled />
      <Input label="Email" type="email" placeholder="email@example.com" />
      <Input label="Password" type="password" placeholder="Enter password" />
    </div>
  ),
};
