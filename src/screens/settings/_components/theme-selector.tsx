import { Label } from 'heroui-native/label'
import { Radio } from 'heroui-native/radio'
import { RadioGroup } from 'heroui-native/radio-group'
import { Text, View } from 'react-native'
import { Uniwind, useUniwind } from 'uniwind'

export const ThemeSelector: React.FC = () => {
  const { theme, hasAdaptiveThemes } = useUniwind()
  const activeTheme = hasAdaptiveThemes ? 'system' : theme

  return (
    <View className='gap-4'>
      <Text className='border-b border-border pb-2 text-lg font-medium text-foreground'>
        Appearance
      </Text>

      <RadioGroup
        value={activeTheme}
        onValueChange={(value) => Uniwind.setTheme(value as 'light' | 'dark')}
      >
        {themes.map((option) => (
          <RadioGroup.Item key={option.value} value={option.value}>
            <Label>
              <Label.Text className='text-sm text-muted'>
                {option.label}
              </Label.Text>
            </Label>
            <Radio />
          </RadioGroup.Item>
        ))}
      </RadioGroup>
    </View>
  )
}

const themes = [
  { label: 'Light Mode', value: 'light' },
  { label: 'Dark Mode', value: 'dark' },
  { label: 'System Default', value: 'system' },
]
