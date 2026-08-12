import { render } from '@testing-library/react'
import type { Email } from '@maildev/core'
import { describe, expect, it, vi } from 'vitest'
import { EmailContent } from './EmailContent'

vi.mock('../../hooks/useEmails', () => ({
  useEmailHtml: () => ({ data: undefined }),
  useEmailSource: () => ({ data: undefined }),
}))

const email: Email = {
  id: 'email-1',
  time: new Date('2026-08-12T00:00:00Z'),
  read: false,
  subject: 'Link test',
  source: '/tmp/email-1.eml',
  size: 100,
  sizeHuman: '100 bytes',
  from: [{ address: 'sender@example.test' }],
  to: [{ address: 'recipient@example.test' }],
  headers: {},
  html: '<a href="https://example.test" target="_blank">Open link</a>',
  attachments: [],
  envelope: {
    from: { address: 'sender@example.test' },
    to: [{ address: 'recipient@example.test' }],
  },
}

describe('EmailContent', () => {
  it('lets user-initiated links escape the email iframe sandbox', () => {
    const { container } = render(<EmailContent email={email} />)
    const sandbox = container.querySelector('iframe')?.getAttribute('sandbox')?.split(/\s+/) ?? []

    expect(sandbox).toContain('allow-popups')
    expect(sandbox).toContain('allow-popups-to-escape-sandbox')
  })
})
