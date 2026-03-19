export interface PrinterItem {
  id: number
  name: string
  ip: string
  location: string
  driver: string
  scriptPath: string
  remark: string
  status: string
}

export const printers: PrinterItem[] = [
  {
    id: 1,
    name: 'Epson L15168（办公室）',
    ip: '192.168.3.214',
    location: '办公室',
    driver: 'EPSON L15168 Series',
    scriptPath: String.raw`\\192.168.120.252\itsupport\1.BAT`,
    remark: '请右键以管理员身份运行',
    status: '推荐',
  },
  {
    id: 2,
    name: 'Canon C5540（17F文印间打印机A）',
    ip: '172.29.20.245',
    location: '17F 文印间',
    driver: 'Canon Generic Plus UFR II',
    scriptPath: String.raw`\\fileserver\打印机安装\Canon_C5540\安装Canon_C5540.bat`,
    remark: '彩色打印，适合办公文印',
    status: '可用',
  },
]