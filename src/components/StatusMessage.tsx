type StatusMessageProps = {
  kind: 'loading' | 'error'
  text: string
}

function StatusMessage({ kind, text }: StatusMessageProps) {
  return (
    <p className={`status-message ${kind}`} role={kind === 'error' ? 'alert' : 'status'}>
      {text}
    </p>
  )
}

export default StatusMessage
