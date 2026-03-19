export const PRINTER_SHARE_PATH = String.raw`\\192.168.120.252\itsupport\打印机驱动\安装说明`

export interface PrinterItem {
  id: number
  name: string
  ip: string
  location: string
  driver: string
  batFile: string
  status: string
}

export const printers: PrinterItem[] = [
  {
    id: 1,
    name: 'EPSON L15160（1栋1F）',
    ip: '192.168.110.250',
    location: '1栋1楼 前台',
    driver: 'EPSON L15160 Series',
    batFile: '1栋1F - EPSON L15160.bat',
    status: '可用',
  },
  {
    id: 2,
    name: 'EPSON L15160（1栋2F）',
    ip: '192.168.3.71',
    location: '1栋2楼',
    driver: 'EPSON L15160 Series',
    batFile: '1栋2F - EPSON L15160.bat',
    status: '可用',
  },
  {
    id: 3,
    name: 'EPSON L15160（2栋2F）',
    ip: '192.168.120.69',
    location: '2栋2楼 饮水机附近',
    driver: 'EPSON L15160 Series',
    batFile: '2栋2F - EPSON L15160.bat',
    status: '可用',
  },
]
