import React, { Component, type ReactNode } from 'react'
import { Box, Typography, Button, Alert } from '@mui/material'
import { Refresh } from '@mui/icons-material'
import { logger } from '@/shared/lib/logger'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

/**
 * Error Boundary для обработки ошибок в React компонентах
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    })

    logger.error('React Error Boundary caught an error', error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: 'ErrorBoundary',
    })

    this.props.onError?.(error, errorInfo)
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            p: 3,
            gap: 2,
          }}
        >
          <Alert severity="error" sx={{ width: '100%', maxWidth: 600 }}>
            <Typography variant="h6" gutterBottom>
              Произошла ошибка
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Что-то пошло не так. Попробуйте обновить страницу или обратитесь к
              администратору.
            </Typography>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="caption"
                  component="pre"
                  sx={{
                    fontSize: '0.75rem',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    p: 1,
                    borderRadius: 1,
                    overflow: 'auto',
                    maxHeight: '200px',
                  }}
                >
                  {this.state.error.message}
                  {this.state.error.stack && `\n\n${this.state.error.stack}`}
                </Typography>
              </Box>
            )}
          </Alert>

          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={this.handleRetry}
            aria-label="Попробовать снова"
          >
            Попробовать снова
          </Button>
        </Box>
      )
    }

    return this.props.children
  }
}

/**
 * Хук для создания Error Boundary с пользовательским обработчиком
 */
export function useErrorHandler() {
  return (error: Error, errorInfo: React.ErrorInfo) => {
    logger.error('Custom error handler', error, {
      componentStack: errorInfo.componentStack,
    })
  }
}
