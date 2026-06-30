import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

// ─── Variants ─────────────────────────────────────────────────────────────────

export const tableVariants = cva(
  'w-full caption-bottom text-sm',
  {
    variants: {
      variant: {
        default:  '',
        striped:  '',
        bordered: '',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

// ─── Context ──────────────────────────────────────────────────────────────────

type TableVariant = 'default' | 'striped' | 'bordered'

interface TableContextValue {
  variant: TableVariant
}

const TableContext = React.createContext<TableContextValue>({ variant: 'default' })

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TableProps
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}
export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}
export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {}

// ─── Components ───────────────────────────────────────────────────────────────

export const Table: React.FC<TableProps> = ({
  variant = 'default',
  className,
  children,
  ...props
}) => {
  return (
    <TableContext.Provider value={{ variant: variant as TableVariant }}>
      <div className="w-full overflow-auto rounded-(--radius-lg) border border-(--color-neutral-200)">
        <table
          className={cn(tableVariants({ variant }), className)}
          {...props}
        >
          {children}
        </table>
      </div>
    </TableContext.Provider>
  )
}
Table.displayName = 'Table'

export const TableHeader: React.FC<TableHeaderProps> = ({
  className,
  children,
  ...props
}) => (
  <thead
    className={cn('bg-(--color-neutral-50) [&_tr]:border-b [&_tr]:border-(--color-neutral-200)', className)}
    {...props}
  >
    {children}
  </thead>
)
TableHeader.displayName = 'TableHeader'

export const TableBody: React.FC<TableBodyProps> = ({
  className,
  children,
  ...props
}) => {
  const { variant } = React.useContext(TableContext)
  return (
    <tbody
      className={cn(
        '[&_tr:last-child]:border-0',
        variant === 'striped' && '[&_tr:nth-child(odd)]:bg-(--color-neutral-50)',
        className
      )}
      {...props}
    >
      {children}
    </tbody>
  )
}
TableBody.displayName = 'TableBody'

export const TableFooter: React.FC<TableFooterProps> = ({
  className,
  children,
  ...props
}) => (
  <tfoot
    className={cn('border-t border-(--color-neutral-200) bg-(--color-neutral-50) font-medium', className)}
    {...props}
  >
    {children}
  </tfoot>
)
TableFooter.displayName = 'TableFooter'

export const TableRow: React.FC<TableRowProps> = ({
  className,
  children,
  ...props
}) => {
  const { variant } = React.useContext(TableContext)
  return (
    <tr
      className={cn(
        'border-b border-(--color-neutral-200) transition-colors hover:bg-(--color-neutral-50)',
        variant === 'bordered' && '[&_td]:border-r [&_td]:last:border-r-0 [&_th]:border-r [&_th]:last:border-r-0',
        className
      )}
      {...props}
    >
      {children}
    </tr>
  )
}
TableRow.displayName = 'TableRow'

export const TableHead: React.FC<TableHeadProps> = ({
  className,
  children,
  ...props
}) => (
  <th
    className={cn(
      'h-10 px-4 text-left align-middle text-xs font-semibold uppercase tracking-wide text-(--color-neutral-500)',
      className
    )}
    {...props}
  >
    {children}
  </th>
)
TableHead.displayName = 'TableHead'

export const TableCell: React.FC<TableCellProps> = ({
  className,
  children,
  ...props
}) => (
  <td
    className={cn('px-4 py-3 align-middle text-(--color-neutral-700)', className)}
    {...props}
  >
    {children}
  </td>
)
TableCell.displayName = 'TableCell'

export const TableCaption: React.FC<TableCaptionProps> = ({
  className,
  children,
  ...props
}) => (
  <caption
    className={cn('mt-4 text-sm text-(--color-neutral-500)', className)}
    {...props}
  >
    {children}
  </caption>
)
TableCaption.displayName = 'TableCaption'