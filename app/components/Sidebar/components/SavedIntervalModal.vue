<script setup lang="ts">
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import { SITE_GROUPS } from '~/core/siteGroups'
import type { SavedIntervals } from '~/composables/useSavedIntervals'
import type Indicator from '~/types/indicator'
import type SelectedDates from '~/types/selectedDates'
import type { ShallowRef } from 'vue'

const { isOpenModal, loadingStats, editing, addInterval, updateInterval } = inject<SavedIntervals>('savedIntervals')!
const selectedDates = inject<ShallowRef<SelectedDates>>('selectedDates')
const selectedIndicator = inject<ShallowRef<Indicator>>('selectedIndicator')
const selectedSiteGroup = inject<ShallowRef<string[]>>('selectedSiteGroup')
const indicators = inject<ShallowRef<Indicator[]>>('indicators')

const open = computed({
    get: () => isOpenModal.value,
    set: (value: boolean) => isOpenModal.value = value
})

const name = ref('')
const description = ref('')
const indicatorCode = ref('')
const siteGroup = ref<string[]>([])

const modelValue = shallowRef<{ start: CalendarDate | null, end: CalendarDate | null }>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone())
})

const range = shallowRef<{ start: CalendarDate, end: CalendarDate }>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone())
})

const parseDate = (value: string): CalendarDate => {
    const [year, month, day] = value.split('-').map(Number)
    return new CalendarDate(year!, month!, day!)
}

const setValidValue = () => {
    if (modelValue.value.start && modelValue.value.end) {
        range.value = { start: modelValue.value.start, end: modelValue.value.end }
    }
}

watch(() => isOpenModal.value, (isOpen) => {
    if (!isOpen) return

    const target = editing.value

    if (target) {
        const start = parseDate(target.dateFrom)
        const end = parseDate(target.dateTo)
        modelValue.value = { start, end }
        range.value = { start, end }
        name.value = target.name
        description.value = target.description ?? ''
        indicatorCode.value = target.indicator?.code ?? selectedIndicator?.value?.code ?? ''
        siteGroup.value = target.siteGroup ? [...target.siteGroup] : []
        return
    }

    const current = selectedDates?.value ?? range.value

    modelValue.value = { start: current.start, end: current.end }
    range.value = { start: current.start, end: current.end }
    name.value = ''
    description.value = ''
    indicatorCode.value = selectedIndicator?.value?.code ?? ''
    siteGroup.value = selectedSiteGroup ? [...selectedSiteGroup.value] : []
})

const submit = async () => {
    if (!modelValue.value.start || !modelValue.value.end) return

    const indicator = indicators?.value?.find(item => item.code === indicatorCode.value)
        ?? (indicatorCode.value ? { code: indicatorCode.value } : undefined)

    const payload = {
        name: name.value,
        description: description.value,
        dateFrom: range.value.start.toString(),
        dateTo: range.value.end.toString(),
        indicator,
        siteGroup: [...siteGroup.value]
    }

    if (editing.value) {
        await updateInterval(editing.value.id, payload)
    } else {
        await addInterval(payload)
    }

    open.value = false
}
</script>

<template>
    <UModal v-model:open="open" :title="editing ? 'Редактировать промежуток' : 'Новый промежуток'">
        <template #body>
            <div class="flex flex-col gap-4">
                <UFormField label="Название">
                    <UInput v-model="name" class="w-full" placeholder="Например: Смог январь 2024" />
                </UFormField>

                <UFormField label="Период">
                    <UCalendar range class="p-2 self-start" v-model="modelValue"
                        @update:validModelValue="setValidValue" />
                </UFormField>

                <UFormField label="Показатель">
                    <USelect v-model="indicatorCode" class="w-full" value-key="code" label-key="name"
                        placeholder="Выберите показатель" :items="indicators ?? []" />
                </UFormField>

                <UFormField label="Посты мониторинга">
                    <USelect v-model="siteGroup" class="w-full" multiple placeholder="Все посты"
                        :items="SITE_GROUPS" />
                </UFormField>

                <UFormField label="Описание">
                    <UTextarea v-model="description" class="w-full" :rows="2"
                        placeholder="Комментарий к промежутку" />
                </UFormField>
            </div>
        </template>

        <template #footer>
            <div class="flex w-full justify-end gap-2">
                <UButton color="neutral" variant="ghost" label="Отмена" @click="open = false" />
                <UButton label="Сохранить" :loading="loadingStats" @click="submit" />
            </div>
        </template>
    </UModal>
</template>
