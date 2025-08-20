/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom/vitest'

declare global {
  namespace _Vi {
    interface _JestAssertion<_T = any> 
      extends Record<string, any> {}
  }
}
