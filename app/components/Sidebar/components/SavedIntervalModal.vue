<script setup lang="ts">
import { getLocalTimeZone, today } from '@internationalized/date'
import type { CalendarDate } from '@internationalized/date'
import type { SavedIntervals } from '~/composables/useSavedIntervals'
import type SelectedDates from '~/types/selectedDates'
import type { ShallowRef } from 'vue'

const { isOpenModal, loadingStats, addInterval } = inject<SavedIntervals>('savedIntervals')!
const selectedDates = inject<ShallowRef<SelectedDates>>('selectedDates')

const open = computed({
    get: () => isOpenModal.value,
    set: (value: boolean) => isOpenModal.value = value
})

const name = ref('')
const description = ref('')

const modelValue = shallowRef<{ start: CalendarDate | null, end: CalendarDate | null }>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone())
})

const range = shallowRef<{ start: CalendarDate, end: CalendarDate }>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone())
})

const setValidValue = () => {
    if (modelValue.value.start && modelValue.value.end) {
        range.value = { start: modelValue.value.start, end: modelValue.value.end }
    }
}

watch(() => isOpenModal.value, (isOpen) => {
    if (!isOpen) return

    const current = selectedDates?.value ?? range.value

    modelValue.value = { start: current.start, end: current.end }
    range.value = { start: current.start, end: current.end }
    name.value = ''
    description.value = ''
})

const submit = async () => {
    if (!modelValue.value.start || !modelValue.value.end) return

    await addInterval({
        name: name.value,
        description: description.value,
        dateFrom: range.value.start.toString(),
        dateTo: range.value.end.toString()
    })

    open.value = false
}
</script>

<template>
    <UModal v-model:open="open" title="Новый промежуток">
        <template #body>
            <div class="flex flex-col gap-4">
                <UFormField label="Название">
                    <UInput v-model="name" class="w-full" placeholder="Например: Смог январь 2024" />
                </UFormField>

                <UFormField label="Период">
                    <UCalendar range class="p-2 self-start" v-model="modelValue"
                        @update:validModelValue="setValidValue" />
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
